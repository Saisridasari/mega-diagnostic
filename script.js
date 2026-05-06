// Mega Diagnostic Centre - Main JavaScript
document.addEventListener("DOMContentLoaded", function () {

    // ========== Mobile Menu Toggle ==========
    const menuBtn = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mainNav");

    if (menuBtn && mainNav) {
        menuBtn.addEventListener("click", function () {
            mainNav.classList.toggle("active");
            menuBtn.innerHTML = mainNav.classList.contains("active")
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking a nav link
        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("active");
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ========== Booking Form → WhatsApp ==========
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        // Set minimum date to today
        const dateInput = document.getElementById("appointmentDate");
        if (dateInput) {
            const today = new Date().toISOString().split("T")[0];
            dateInput.setAttribute("min", today);
        }

        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("patientName").value.trim();
            const phone = document.getElementById("patientPhone").value.trim();
            const date = document.getElementById("appointmentDate").value;

            // Basic validation
            if (!name || !phone || !date) {
                alert("Please fill in all fields.");
                return;
            }

            // Format date for readability
            const formattedDate = new Date(date).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            // Build WhatsApp message
            const message = encodeURIComponent(
                "🏥 *Mega Diagnostic Centre - Appointment Request*\n\n" +
                "👤 Name: " + name + "\n" +
                "📞 Phone: " + phone + "\n" +
                "📅 Date: " + formattedDate + "\n\n" +
                "Please confirm my appointment. Thank you!"
            );

            // Open WhatsApp with the message
            const whatsappUrl = "https://wa.me/918121254402?text=" + message;
            window.open(whatsappUrl, "_blank");

            // Reset form
            bookingForm.reset();
        });
    }

    // ========== Back to Top Button ==========
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ========== Footer Year ==========
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ========== Scroll Animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate service cards and contact cards on scroll
    document.querySelectorAll(".service-card, .contact-card, .info-item, .price-item").forEach(function (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(el);
    });

});
