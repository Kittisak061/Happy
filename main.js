const photoInput = document.querySelector("#photo-upload");
const birthdayPhoto = document.querySelector("#birthday-photo");
const uploadStatus = document.querySelector("#upload-status");
const revealItems = document.querySelectorAll(".reveal");

if (photoInput && birthdayPhoto && uploadStatus) {
  photoInput.addEventListener("change", (event) => {
    const [file] = event.target.files || [];

    if (!file) {
      uploadStatus.textContent = "ยังไม่ได้เลือกรูป ระบบจะแสดงรูปตัวอย่างไว้ก่อน";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    birthdayPhoto.src = previewUrl;
    birthdayPhoto.onload = () => URL.revokeObjectURL(previewUrl);
    uploadStatus.textContent = `เรียบร้อยแล้ว: ${file.name}`;
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("load", () => {
  revealItems.forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), 120 * index);
  });
});
