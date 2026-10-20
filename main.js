const flowerAssets = [
  "imgaes/download-removebg-preview.png",
  "imgaes/download__1_-removebg-preview.png",
  "imgaes/download__2_-removebg-preview.png",
];

// THAY NỘI DUNG LỜI CHÚC Ở ĐÂY.
const loveMessage =
  "Cảm ơn em vì đã làm những ngày bình thường của anh trở nên thật đặc biệt. Mong rằng mỗi ngày của em đều dịu dàng, rực rỡ và ngọt ngào như khu vườn nhỏ này. Anh thương em nhiều lắm!";

const body = document.body;
const garden = document.querySelector("#garden");
const firstFlowerButton = document.querySelector("#first-flower");
const invitation = document.querySelector("#invitation");
const dedication = document.querySelector("#dedication");
const messageElement = document.querySelector("#love-message");
const ground = document.querySelector(".ground");
const foreground = document.querySelector(".foreground");
const fireflies = document.querySelector("#fireflies");

messageElement.textContent = loveMessage;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

function createFireflies() {
  const count = window.matchMedia("(max-width: 600px)").matches ? 20 : 34;

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = "firefly";
    particle.style.setProperty("--fly-x", `${randomBetween(3, 97)}%`);
    particle.style.setProperty("--fly-y", `${randomBetween(5, 76)}%`);
    particle.style.setProperty("--fly-size", `${randomBetween(2, 5)}px`);
    particle.style.setProperty("--fly-duration", `${randomBetween(3.5, 7)}s`);
    particle.style.setProperty("--fly-delay", `${randomBetween(0, 4)}s`);
    particle.style.setProperty("--fly-dx", `${randomBetween(-24, 24)}px`);
    fireflies.append(particle);
  }
}

function createGarden() {
  const mobile = window.matchMedia("(max-width: 600px)").matches;
  const count = mobile ? 25 : 39;
  const gardenHeight = mobile ? 42 : 54;

  for (let index = 0; index < count; index += 1) {
    const flower = document.createElement("img");
    const progress = index / (count - 1);
    const flowerSize = mobile
      ? randomBetween(95, 155)
      : randomBetween(135, 215);
    const bottom = randomBetween(0, mobile ? 15 : 22);

    flower.className = "garden-flower";
    flower.src = flowerAssets[Math.floor(Math.random() * flowerAssets.length)];
    flower.alt = "";
    flower.setAttribute("aria-hidden", "true");
    flower.draggable = false;
    flower.style.setProperty(
      "--flower-x",
      `${progress * 100 + randomBetween(-1.4, 1.4)}%`,
    );
    flower.style.setProperty("--flower-size", `${flowerSize}px`);
    flower.style.setProperty("--flower-size-mobile", `${flowerSize}px`);
    flower.style.setProperty("--flower-bottom", `${bottom}px`);
    flower.style.setProperty("--flower-tilt", `${randomBetween(-16, 16)}deg`);
    flower.style.setProperty(
      "--flower-delay",
      `${0.12 + progress * 1.25 + randomBetween(0, 0.3)}s`,
    );
    flower.style.zIndex = `${Math.floor(randomBetween(1, 4))}`;
    flower.style.maxHeight = `${gardenHeight}vh`;
    garden.append(flower);
  }
}

function openGarden() {
  if (body.classList.contains("is-open")) return;

  body.classList.add("is-open");
  invitation.classList.add("is-hidden");
  firstFlowerButton.setAttribute("aria-hidden", "true");
  firstFlowerButton.disabled = true;
  firstFlowerButton.classList.add("is-fading");
  ground.classList.add("is-visible");
  foreground.classList.add("is-visible");

  createGarden();
  createFireflies();

  window.setTimeout(() => {
    garden.querySelectorAll(".garden-flower").forEach((flower) => {
      flower.classList.add("is-grown");
    });
  }, 50);

  window.setTimeout(() => {
    dedication.classList.add("is-visible");
  }, 2100);

  window.setTimeout(() => {
    firstFlowerButton.remove();
  }, 1100);
}

firstFlowerButton.addEventListener("click", openGarden, { once: true });
