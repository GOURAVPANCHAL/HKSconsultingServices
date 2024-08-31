(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);
  // Company logos
  $(".company-logos").owlCarousel({
    autoplay: true,
    autoplayTimeout: 1000, // Time between transitions (in milliseconds)
    smartSpeed: 300, // Transition speed (in milliseconds)
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 2,
      },
      992: {
        items: 6,
      },
    },
  });
  
// Job Post Form Submission
document
  .getElementById("jobPostForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const job = {
      jobTitle: formData.get("title"),
      companyName: formData.get("company"),
      location: formData.get("location"),
      jobType: formData.get("jobType"),
      description: formData.get("description"),
      salary: formData.get("salary"),
      requirements: formData.get("requirements"),
      deadline: formData.get("deadline"),
    };

    // Handle image upload
    const imageFile = formData.get("image");
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        job.logoUrl = reader.result;
        storeJob(job);
      };
      reader.readAsDataURL(imageFile); // Convert image to base64
    } else {
      job.logoUrl = "default-logo.jpg"; // Set default if no image is provided
      storeJob(job);
    }
  });

function storeJob(job) {
  let jobs = localStorage.getItem("jobs");
  jobs = jobs ? JSON.parse(jobs) : [];
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  alert("Job posted successfully!");
}

// email section
// Web3Forms API key
const apiKey = "102d2aaf-ea77-471d-abe7-460e23c5bfcf";

// Add event listener for the form submission
document
  .getElementById("applicationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object to easily access form fields
    const formData = new FormData(this);

    // Prepare the data object for Web3Forms
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      resume: formData.get("resume") ? formData.get("resume").name : "",
      coverLetter: formData.get("cover-letter"),
    };

    // Prepare the form data for sending
    const formContent = new URLSearchParams();
    formContent.append("name", data.name);
    formContent.append("email", data.email);
    formContent.append("phone", data.phone);
    formContent.append("resume", data.resume);
    formContent.append("coverLetter", data.coverLetter);

    // Send the data to Web3Forms
    fetch("https://web3forms.com/api/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${apiKey}`,
      },
      body: formContent.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Application submitted successfully!");
          // Hide the modal after successful submission
          $("#exampleModal").modal("hide");
        } else {
          throw new Error(
            data.message || "There was an error submitting your application."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting your application.");
      });
  });
