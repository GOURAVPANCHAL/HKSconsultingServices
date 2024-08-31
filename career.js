document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("applicationForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      // Show loader
      let spinner = document.getElementById("spinner");
      spinner.style.opacity = "0.8";
      spinner.style.visibility = "visible";

      try {
        const response = await fetch(
          "https://api.hksconsultingplacementservices.com/api/form-send",
          {
            method: "POST",
            body: formData,
          }
        );

        // Check if the response is successful
        if (response.ok) {
          // Try to parse the JSON response
          try {
            const result = await response.json();
            console.log("Response ".response);
            alert(result.message || "Application submitted successfully!");
            console.log(result);
          } catch (jsonError) {
            // Handle cases where response is not valid JSON
            alert(
              //   "Application submitted successfully but failed to parse response."
              "Application submitted successfully"
            );
            console.error("JSON Parsing Error:", jsonError);
          }
        } else {
          // Handle non-OK responses
          const errorText = await response.text();
          alert("There was an error submitting your application: " + errorText);
          console.error("Error Response:", response.statusText);
        }
      } catch (error) {
        // Handle network or other errors

        alert("An unexpected error occurred: " + error.message);
        console.error("Unexpected Error:", error);
      } finally {
        spinner.style.opacity = "0";
        spinner.style.visibility = "hidden";

        document.getElementById("applyModal").classList.remove("show");
        document.querySelector(".modal-backdrop.show").style.opacity = "0";
      }
    });
});

// Define an array of job listings
const jobListings = [
  {
    title: "Dot Net Developer",
    location: "Noida / Gurgaon / Delhi",
    description:
      "We are looking for a skilled Dot Net Developer to join our team.",
    link: "#",
    price: "25,000-35,000",
  },
  {
    title: "Social Media Executive",
    location: "Gurgaon / Delhi",
    description:
      "We need a Social Media Executive to manage and enhance our social media presence.",
    link: "#",
    price: "37,000-45,000",
  },
  {
    title: "Travel Reservation Executive",
    location: "Noida",
    description:
      "Join us as a Travel Reservation Executive and assist customers with their travel bookings.",
    link: "#",
    price: "42,000-50,000",
  },
  {
    title: "Customer Care Executive",
    location: "Gurgaon",
    description:
      "We are hiring a Customer Care Executive to provide excellent service and support to our clients.",
    link: "#",
    price: "39,000-50,000",
  },
  {
    title: "Help Desk Executive",
    location: "Delhi / Mumbai",
    description:
      "We need a Help Desk Executive to provide technical support and troubleshooting.",
    link: "#",
    price: "20,000-25,000",
  },
  {
    title: "Content Writer",
    location: "Noida / Gurgaon / Delhi / Mumbai",
    description:
      "Looking for a creative Content Writer to produce engaging content for various platforms.",
    link: "#",
    price: "10,000-20,000",
  },
  {
    title: "Business Development Manager (BD)",
    location: "Noida / Gurgaon / Delhi / Mumbai / Hyderabad / Bangalore",
    description:
      "Seeking a BD Manager to drive business growth and develop strategic partnerships.",
    link: "#",
    price: "50,000-60,000",
  },
  {
    title: "Purchase Manager",
    location: "Noida / Gurgaon / Delhi / Mumbai",
    description:
      "We need a Purchase Manager to handle procurement and supply chain management.",
    link: "#",
    price: "10,000-20,000",
  },
  {
    title: "SEO Specialist",
    location: "Noida / Gurgaon / Delhi",
    description:
      "Looking for an SEO Specialist to optimize our website and improve search engine rankings.",
    link: "#",
    price: "14,000-30,000",
  },
  {
    title: "Office Coordinator",
    location: "Bangalore",
    description:
      "We need an Office Coordinator to manage office operations and support daily activities.",
    link: "#",
    price: "46,000-50,000",
  },
  {
    title: "HR Manager",
    location: "Delhi / Mumbai",
    description:
      "Hiring an HR Manager to handle recruitment, employee relations, and HR policies.",
    link: "#",
    price: "20,000-30,000",
  },
  {
    title: "Accountant",
    location: "Noida / Gurgaon / Delhi / Mumbai / Hyderabad / Bangalore",
    description:
      "We need an Accountant to manage financial records and ensure accuracy in transactions.",
    link: "#",
    price: "30,000-40,000",
  },
  {
    title: "Educational Content Creator",
    location: "Noida / Gurgaon / Delhi / Mumbai / Hyderabad / Bangalore",
    description:
      "Looking for an Educational Content Creator to develop engaging and informative content.",
    link: "#",
    price: "35,000-45,000",
  },
  {
    title: "Marketing Executive",
    location: "Delhi",
    description:
      "Seeking a Marketing Executive to create and execute marketing strategies.",
    link: "#",
    price: "20,000-40,000",
  },
  {
    title: "Hindi Callers",
    location: "Gurgaon / Delhi / Mumbai",
    description:
      "We need Hindi Callers to handle customer inquiries and support.",
    link: "#",
    price: "20,000-30,000",
  },
  {
    title: "English Callers",
    location: "Gurgaon / Delhi / Mumbai",
    description:
      "Looking for English Callers to manage customer interactions and provide support.",
    link: "#",
    price: "20,000-25,000",
  },
  {
    title: "Counsellor",
    location: "Gurgaon / Delhi / Mumbai",
    description:
      "Seeking a Counsellor to provide guidance and support to individuals.",
    link: "#",
    price: "10,000-20,000",
  },
  {
    title: "HR Executive",
    location: "Gurgaon / Delhi / Mumbai",
    description:
      "We need an HR Executive to assist with recruitment and employee management.",
    link: "#",
    price: "20,000-40,000",
  },
  {
    title: "Software Developer (Testing)",
    location: "Gurgaon / Delhi / Mumbai",
    description:
      "Looking for a Software Developer with a focus on testing to ensure software quality.",
    link: "#",
    price: "50,000-1,00,000",
  },
  {
    title: "Quality Analyst",
    location: "Hyderabad / Bangalore",
    description:
      "Seeking a Quality Analyst to assess and improve product quality.",
    link: "#",
    price: "35,000-40,000",
  },
  {
    title: "Teaching Jobs (Online and Offline)",
    location: "Gurgaon / Delhi / Hyderabad / Bangalore",
    description:
      "We are hiring for teaching positions both online and offline across various subjects.",
    link: "#",
    price: "20,000-25,000",
  },
];

// Function to generate job listing HTML
function generateJobListings() {
  const container = document.getElementById("job-listings-container");
  container.innerHTML = ""; // Clear existing content

  jobListings.forEach((job) => {
    const jobItem = document.createElement("div");
    jobItem.classList.add("job-listing", "job-item", "py-3", "p-md-3", "mb-5");

    jobItem.innerHTML = `<div class="container">
<div class="row g-4 align-items-center">
    <div class="col-12 col-md-10 d-flex flex-column flex-md-row align-items-center">
        <img
            class="img-fluid border rounded mb-3 mb-md-0"
            src="img/logo.png"
            alt=""
            style="width: 80px; height: 80px;"
        />
        <div class="text-start ps-1 ps-md-4">
            <h5 class="mb-2 mb-md-3">${job.title}</h5>
            <div class="flex-column flex-sm-row">
                <div class="text-truncate me-3 mb-2 mb-sm-0 text-wrap">
                    <i class="fa fa-map-marker-alt text-primary me-2"></i>${job.location}
                </div>
                <div class="text-truncate me-3 mb-2 mb-sm-0 text-wrap">
                    <i class="far fa-clock text-primary me-2"></i>${job.description}
                </div>
                <div class="text-truncate mb-2 mb-sm-0 text-wrap
                ">
                    <i class="far fa-money-bill-alt text-primary me-2"></i>${job.price}
                </div>
            </div>
        </div>
    </div>
    <!-- Apply Now Button -->
    <div class="col-12 col-md-2 text-center text-md-end">
        <a href="#" class="btn btn-primary apply-now-btn" data-job-id="${job.id}">Apply Now</a>
    </div>
</div>
</div>
`;

    container.appendChild(jobItem);
  });

  // Add event listeners to "Apply Now" buttons
  document.querySelectorAll(".apply-now-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      // Open the modal
      const applyModal = new bootstrap.Modal(
        document.getElementById("applyModal")
      );
      applyModal.show();
    });
  });
}

generateJobListings();
