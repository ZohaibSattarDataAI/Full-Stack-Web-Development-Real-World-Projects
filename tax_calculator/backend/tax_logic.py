# ==========================================
# Tax Logic File
# Developed by #ZohaibSattarDataAI
# ==========================================

def calculate_tax(salary):

    """
    Original tax logic with bug preserved.
    """

    if salary > 30000:
        tax_rate = 0

    elif 30000 >= salary >= 70000:
        tax_rate = 0.15

    else:
        tax_rate = 0.25

    tax = salary * tax_rate
    final_salary = salary - tax

    return {
        "salary": salary,
        "tax_rate": tax_rate,
        "tax_rate_percent": tax_rate * 100,
        "tax": tax,
        "final_salary": final_salary
    }


def calculate_tax_corrected(salary):

    if salary <= 30000:
        tax_rate = 0.0   # 0%

    elif salary <= 70000:
        tax_rate = 0.15  # 15%

    else:
        tax_rate = 0.25  # 25%

    tax = salary * tax_rate
    final_salary = salary - tax

    return {
        "salary": salary,
        "tax_rate": tax_rate,
        "tax_rate_percent": tax_rate * 100,
        "tax": tax,
        "final_salary": final_salary
    }


# Standalone Testing
if __name__ == "__main__":

    salary = float(input("Enter salary: "))

    result = calculate_tax_corrected(salary)

    print("\n===== RESULT =====")
    print("Salary:", result["salary"])
    print("Tax Rate:", result["tax_rate_percent"], "%")
    print("Tax Amount:", result["tax"])
    print("Final Salary:", result["final_salary"])