---
---
//Testimonial Data
const testimonials = [
  {% for testimonial in site.data.testimonials %}
    {
      name: "{{ testimonial.name }}",
      job: "{{ testimonial.job }}",
      image: "{{ testimonial.image }}",
      link: "{{ testimonial.link }}",
      testimonial: "{{ testimonial.testimonial }}"
    },
  {% endfor %}
];

//Current Slide
let i = 0;
//Total Slides
let j = testimonials.length;

let testimonialContainer = document.getElementById("testimonial-container");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

nextBtn.addEventListener("click", () => {
  i = (j + i + 1) % j;
  displayTestimonial();
});
prevBtn.addEventListener("click", () => {
  i = (j + i - 1) % j;
  displayTestimonial();
});

let displayTestimonial = () => {
  testimonialContainer.innerHTML = `
    <p>${testimonials[i].testimonial}</p>
    <img src=${testimonials[i].image}>
    <h3>${testimonials[i].name}</h3>
    <h6>${testimonials[i].job}</h6>
    <p><a href="${testimonials[i].link}" target="_blank">Переглянути весь коментар</a></p>
  `;
};
window.onload = displayTestimonial;
