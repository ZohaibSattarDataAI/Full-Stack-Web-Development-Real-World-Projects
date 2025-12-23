from django.shortcuts import render, redirect

from django.contrib import messages

def Home(request):
    return render(request, "PortfolioHome.html")

def About(request):
    return render(request, "About.html")

def Skills(request):
    return render(request, "Skill.html")

def Projects(request):
    return render(request, "Projects.html")

def Hire(request):
    return render(request, "Hire.html")

def Contact(request):
    return render(request, "Contact_us.html")

def Contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        # (Abhi database use nahi kar rahe — simple)
        messages.success(request, "✅ Your message has been sent successfully!")

        return redirect("Contact_us")  # IMPORTANT 🔥

    return render(request, "Contact_us.html")


