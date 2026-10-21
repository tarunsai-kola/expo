import sqlite3
import sys
import os

def format_table(columns, data):
    if not columns:
        return "(Empty result set)"
    widths = [len(str(c)) for c in columns]
    for row in data:
        for i, val in enumerate(row):
            display_val = str(val) if val is not None else 'NULL'
            widths[i] = max(widths[i], len(display_val))
    sep = '+' + '+'.join('-' * (w + 2) for w in widths) + '+'
    header = '| ' + ' | '.join(str(c).ljust(w) for c, w in zip(columns, widths)) + ' |'
    out = [sep, header, sep]
    for row in data:
        line = '| ' + ' | '.join((str(val) if val is not None else 'NULL').ljust(w) for val, w in zip(row, widths)) + ' |'
        out.append(line)
    out.append(sep)
    out.append("(%d rows in set)" % len(data))
    return '\n'.join(out)

def main():
    if len(sys.argv) < 2:
        print("Usage: python sql_runner.py <query.sql> [input_schema.sql]")
        sys.exit(1)

    sql_file = sys.argv[1]
    input_file = sys.argv[2] if len(sys.argv) > 2 else None

    con = sqlite3.connect(':memory:')
    cur = con.cursor()

    # Built-in practice database schema
    default_schema = """
CREATE TABLE IF NOT EXISTS Employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT,
    salary INTEGER,
    manager_id INTEGER
);
INSERT OR IGNORE INTO Employees (id, name, department, salary, manager_id) VALUES
(1, 'Alice Smith', 'Engineering', 95000, NULL),
(2, 'Bob Jones', 'Engineering', 80000, 1),
(3, 'Charlie Brown', 'Marketing', 65000, NULL),
(4, 'Diana Prince', 'Marketing', 72000, 3),
(5, 'Evan Wright', 'Finance', 90000, NULL),
(6, 'Fiona Gallagher', 'Engineering', 105000, 1);

CREATE TABLE IF NOT EXISTS Departments (
    id INTEGER PRIMARY KEY,
    dept_name TEXT,
    location TEXT
);
INSERT OR IGNORE INTO Departments (id, dept_name, location) VALUES
(1, 'Engineering', 'Building A'),
(2, 'Marketing', 'Building B'),
(3, 'Finance', 'Building C');

CREATE TABLE IF NOT EXISTS Customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT
);
INSERT OR IGNORE INTO Customers (id, name, email) VALUES
(1, 'John Doe', 'john@example.com'),
(2, 'Jane Doe', 'jane@example.com'),
(3, 'Bob Smith', 'bob@example.com');

CREATE TABLE IF NOT EXISTS Orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_date TEXT,
    amount REAL
);
INSERT OR IGNORE INTO Orders (id, customer_id, order_date, amount) VALUES
(1, 1, '2026-01-15', 250.00),
(2, 1, '2026-02-10', 120.50),
(3, 2, '2026-03-05', 499.99);
"""
    try:
        cur.executescript(default_schema)
    except Exception as e:
        print("Default Schema Error: %s" % e)

    # If custom input schema file provided, execute it
    if input_file and os.path.exists(input_file):
        try:
            with open(input_file, "r", encoding="utf-8") as inf:
                custom_sql = inf.read()
                if custom_sql.strip():
                    cur.executescript(custom_sql)
        except Exception as e:
            print("Custom Schema Error: %s" % e)

    # Read user SQL query
    try:
        with open(sql_file, "r", encoding="utf-8") as sqf:
            user_sql = sqf.read()
    except Exception as e:
        print("Read Error: %s" % e)
        sys.exit(1)

    statements = [s.strip() for s in user_sql.split(';') if s.strip()]
    if not statements:
        print("(No SQL statements provided)")
        return

    for stmt in statements:
        try:
            cur.execute(stmt)
            if cur.description:
                cols = [d[0] for d in cur.description]
                rows = cur.fetchall()
                print(format_table(cols, rows))
            else:
                con.commit()
                print("Query OK, %d row(s) affected" % cur.rowcount)
        except Exception as err:
            print("SQL Error: %s" % err)

if __name__ == '__main__':
    main()
