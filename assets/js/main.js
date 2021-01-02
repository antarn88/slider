"use strict";

import photoInfos from "./photoInfos.js";
import { slider, photoCounters, previousButton, nextButton, photoTitle, photoPagination } from "./domElements.js";

let activePhoto = 1;
const getCurrentPhotoNumber = () => parseInt(photoCounters.textContent.split("/")[0]);
const setCurrentPhotoNumber = number => photoCounters.textContent = `${number}/4`;
const changePhoto = photoNumber => {
    const expectedPhotoPath = photoInfos[photoNumber - 1].path;
    slider.style.background = `url(${expectedPhotoPath})`;
};
const changePhotoTitle = photoNumber => {
    const expectedPhotoTitle = photoInfos[photoNumber - 1].title;
    photoTitle.textContent = expectedPhotoTitle;
};
const setPhotoPagination = (photoNumber) => {
    activePhoto = photoNumber;
    Array.from(photoPagination).forEach((item, index) => {
        if (index === photoNumber - 1) {
            item.classList.remove("passive");
            item.classList.add("active")
        } else {
            item.classList.remove("active");
            item.classList.add("passive");
        }
    });
};
const previousButtonAction = () => {
    const currentPhotoNumber = getCurrentPhotoNumber();
    if (currentPhotoNumber > 1) {
        setSliderState(currentPhotoNumber - 1)
        activePhoto = currentPhotoNumber - 1;
    }
};
const nextButtonAction = () => {
    const currentPhotoNumber = getCurrentPhotoNumber();
    if (currentPhotoNumber < 4) {
        setSliderState(currentPhotoNumber + 1)
        activePhoto = currentPhotoNumber + 1;
    }
};
const setEventListeners = () => {
    previousButton.addEventListener("click", previousButtonAction);
    nextButton.addEventListener("click", nextButtonAction);
    Array.from(photoPagination).forEach((item, index) => {
        item.addEventListener("click", function () {
            setSliderState(index + 1);
        });
    });
};
const setFirstPhoto = () => setSliderState(1);
const setSliderState = (photoNumber) => {
    setCurrentPhotoNumber(photoNumber);
    changePhoto(photoNumber);
    changePhotoTitle(photoNumber);
    setPhotoPagination(photoNumber);
};
const autorunSlider = (seconds) => {
    const interval = seconds * 1000;
    setInterval(() => {
        if (activePhoto < 5) {
            setSliderState(activePhoto);
            activePhoto++;
        }
        activePhoto === 5 ? activePhoto = 1 : null;
    }, interval);
};
const setSliderHeight = (height = "50%") => {
    const slider = document.querySelector(".slider");
    slider.style.height = height;
};

// MAIN
(() => {
    setEventListeners();
    setSliderHeight();
    setFirstPhoto();
    autorunSlider(4);
})();
