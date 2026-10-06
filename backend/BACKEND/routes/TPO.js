const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const TPO = require("../models/TPO");
const User = require("../models/User");
const TPOJob = require("../models/TPOJob");
const { sendEmail } = require("../controllers/emailController");
const { buildPremiumEmail } = require("../utils/emailTemplate");
const CreateAdvCourse = require("../models/CreateAdvCourse");
const AdvEnroll = require("../models/AdvEnroll");

// Create TPO (Admin only)
router.post("/create-tpo", async (req, res) => {
    try {
        const { fullname, email, phone, password, collegeName } = req.body;

        const existingTPO = await TPO.findOne({ email });
        if (existingTPO) {
            return res.status(400).json({ message: "TPO already exists with this email" });
        }

        const newTPO = new TPO({
            fullname,
            email,
            phone,
            password,
            collegeName
        });

        await newTPO.save();
        res.status(201).json({ message: "TPO account created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// TPO Login
router.post("/tpo-login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const tpo = await TPO.findOne({ email });
        if (!tpo) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (password !== tpo.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: tpo._id, role: "tpo" },
            process.env.JWT_SECRET || "fallbacksecret",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            tpo: {
                id: tpo._id,
                fullname: tpo.fullname,
                email: tpo.email,
                collegeName: tpo.collegeName
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get TPO Dashboard Data
router.get("/dashboard/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tpo = await TPO.findById(id);
        if (!tpo) return res.status(404).json({ message: "TPO not found" });

        const students = await User.find({
            $or: [
                { college: { $regex: new RegExp(tpo.collegeName, "i") } },
                { collegeName: { $regex: new RegExp(tpo.collegeName, "i") } },
                { CollegeName: { $regex: new RegExp(tpo.collegeName, "i") } }
            ]
        }).select("-password").sort({ createdAt: -1 });

        const jobs = await TPOJob.find({ tpoId: tpo._id }).sort({ createdAt: -1 });

        res.status(200).json({
            tpo,
            totalStudents: students.length,
            students,
            jobs
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Create Student via TPO
router.post("/create-student", async (req, res) => {
    try {
        const { tpoId, fullname, email, password, branch } = req.body;
        
        const tpo = await TPO.findById(tpoId);
        if (!tpo) return res.status(404).json({ message: "TPO not found" });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // isTPOStudent flag can be used to unlock courses in frontend
        const newStudent = new User({
            fullname,
            email,
            password,
            phone: "0000000000", // Defaults for TPO-created
            college: tpo.collegeName,
            collegeName: tpo.collegeName,
            branch: branch || "Not Specified",
            isTPOStudent: true, 
            status: "active",
            atschecker: true,
            jobboard: true,
            myjob: true,
            mockinterview: true,
            exercise: true,
            advance: true
        });

        await newStudent.save();

        res.status(201).json({ message: "Student created successfully", student: newStudent });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Send Credentials to Student
router.post("/send-student-credentials", async (req, res) => {
    try {
        const { email, password, fullname } = req.body;
        const loginUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL + "/login" : "http://localhost:5173/login";

        const content = `
            <p style="font-size: 16px; color: #0f172a; font-weight: 600;">Dear ${fullname},</p>
            <p>Your college Placement Officer has created an exclusive LMS account for you.</p>
            <p>This account grants you premium access to our courses and exclusive placement drives.</p>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${loginUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login Now</a>
            </div>
        `;

        const emailMessage = buildPremiumEmail({ title: 'Your LMS Account Details', content });
        
        await sendEmail({
            email,
            subject: `Your Placement LMS Credentials`,
            message: emailMessage,
        });

        res.status(200).json({ message: "Credentials sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending credentials", error: error.message });
    }
});

// Post a new Job by TPO
router.post("/post-job", async (req, res) => {
    try {
        const { tpoId, companyName, jobTitle, description, interviewDate, targetBranches, applyLink } = req.body;

        const tpo = await TPO.findById(tpoId);
        if (!tpo) return res.status(404).json({ message: "TPO not found" });

        const newJob = new TPOJob({
            tpoId,
            collegeName: tpo.collegeName,
            companyName,
            jobTitle,
            description,
            interviewDate,
            targetBranches,
            applyLink
        });

        await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete a Job
router.delete("/job/:jobId", async (req, res) => {
    try {
        await TPOJob.findByIdAndDelete(req.params.jobId);
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get Student Jobs (used by student LMS)
router.get("/student-jobs/:studentId", async (req, res) => {
    try {
        const student = await User.findById(req.params.studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Get jobs for this college
        // We can filter by targetBranches as well, but for now we'll match college.
        // If targetBranches contains "All" or matches student's branch, include it.
        const collegeMatches = [student.college, student.collegeName, student.CollegeName].filter(Boolean);
        
        if (collegeMatches.length === 0) {
            return res.status(200).json([]);
        }

        const jobs = await TPOJob.find({
            collegeName: { $in: collegeMatches.map(c => new RegExp(`^${c}$`, "i")) },
            isActive: true
        }).sort({ createdAt: -1 });

        // Filter by branch
        const studentBranch = student.branch || "";
        const visibleJobs = jobs.filter(job => {
            if (job.targetBranches.includes("All")) return true;
            if (job.targetBranches.some(b => studentBranch.toLowerCase().includes(b.toLowerCase()))) return true;
            return false;
        });

        res.status(200).json(visibleJobs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get All TPOs (Admin)
router.get("/all", async (req, res) => {
    try {
        const tpos = await TPO.find({});
        res.status(200).json(tpos);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// TPO Student Multi-Course Enrollment
router.post("/tpo-enroll-courses", async (req, res) => {
    try {
        const { email, fullname, phone, collegeName, courses } = req.body;

        if (!courses || !Array.isArray(courses) || courses.length === 0) {
            return res.status(400).json({ message: "Please select at least one course." });
        }

        const enrollmentsToCreate = [];

        for (const domain of courses) {
            // Find the course in CreateAdvCourse
            const course = await CreateAdvCourse.findOne({
                title: { $regex: new RegExp(`^${domain.trim()}$`, "i") }
            });

            if (!course) {
                console.warn(`[TPO Enroll] Course not found: ${domain}`);
                continue;
            }

            // Check if already enrolled
            const existing = await AdvEnroll.findOne({ email, domainId: course._id });
            if (existing) continue;

            const newEnrollment = new AdvEnroll({
                fullname,
                email,
                phone: phone || "0000000000",
                counselor: "TPO Provided",
                domain: course.title,
                program: course.title,
                domainId: course._id,
                programPrice: 0,
                paidAmount: 0,
                remainingAmount: 0,
                monthOpted: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
                clearPaymentMonth: "N/A",
                modeofpayment: "TPO Scholarship",
                status: "fullPaid",
                companyName: collegeName,
                transactionId: `TPO-FREE-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            });
            
            enrollmentsToCreate.push(newEnrollment);
        }

        if (enrollmentsToCreate.length > 0) {
            await AdvEnroll.insertMany(enrollmentsToCreate);
        }

        res.status(201).json({ message: "Courses registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
