import mojs from "@mojs/core";
import * as utils from "./utils";
import * as spinner from "./spinner";
import { debounce, throttle } from "lodash";

const isFirefox = typeof InstallTrigger !== "undefined";

const navbar = $("#navbar");
const heroWrapper = $(".hero-wrapper");
const heroSections = $(".hero-column");
const leftSection = $(".left-section");
const mainHeadingLeft = $(".left-section .main-heading");
const mainHeadingRight = $(".right-section .main-heading");
const rightSection = $(".right-section");
const backTopLink = $(".back-top-link");

const bouncyCircle = new mojs.Shape({
	parent: ".reveal-circle",
	shape: "circle",
	fill: { "#0c0d16": "#16162b" },
	radius: { 15: 50 },
	duration: 2000,
	isYoyo: true,
	speed: 1,
	isShowStart: true,
	easing: "elastic.inout",
	repeat: 1000,
}).play();

let offsetForWaypoint;

function checkPosition() {
	if (window.matchMedia("(width >= 992px)").matches) {
		heroSections.addClass("desktop");
		heroSections.removeAttr("style");
		offsetForWaypoint = function () {
			return "100%";
		};
	} else {
		heroSections.removeClass("desktop");
		heroSections.removeAttr("style");
	}
}

function updateBackTopButton() {
	if ($(navbar).isInViewport()) {
		backTopLink.removeClass("shown");
	} else {
		backTopLink.addClass("shown");
	}
}

$(document).on("DOMContentLoaded", function () {
	utils.animateOnWaypoint(".work .card-wrapper", "animate__fadeInUp animate__faster", "100%");
	utils.animateOnWaypoint(".section__section-heading", "animate__fadeInUp", "100%");
	utils.animateOnWaypoint(".about-mobile", "animate__fadeInUp", "100%");
	utils.animateOnWaypoint(".picture-container", "animate__fadeInUp", "100%");

	$(".reveal-circle").on("mouseover", function () {
		$(".picture-container").addClass("expanded");
		$(".picture.top.animate__animated").addClass("animate__slideBottomTop--top-picture slower");
		$(".picture.top.animate__animated").removeClass("animate__slideTopBottom--top-picture slower");
		$(".picture.bottom.animate__animated").addClass("animate__slideBottomTop--bottom-picture slower");
		$(".picture.bottom.animate__animated").removeClass("animate__slideTopBottom--bottom-picture slower");
		$(".about-text-wrapper").addClass("animate__about-text--entrance slower");
		$(".about-text-wrapper").removeClass("animate__about-text--exit slower");
		$(".reveal-circle").addClass("animate__fadeOut fastest");
		$(".reveal-circle").removeClass("animate__fadeIn fastest");
		bouncyCircle.pause(0);
	});

	$(".about-text-wrapper").on("mouseleave", function () {
		//Fix by leaving mouse of the paragraph - selector should be on mouseleave of paragraph

		$(".picture-container").removeClass("expanded");
		$(".picture.top.animate__animated").removeClass("animate__slideBottomTop--top-picture slower");
		$(".picture.top.animate__animated").addClass("animate__slideTopBottom--top-picture slower");
		$(".picture.bottom.animate__animated").removeClass("animate__slideBottomTop--bottom-picture slower");
		$(".picture.bottom.animate__animated").addClass("animate__slideTopBottom--bottom-picture slower");
		$(".about-text-wrapper").removeClass("animate__about-text--entrance slower");
		$(".about-text-wrapper").addClass("animate__about-text--exit slower");

		$(".reveal-circle").removeClass("animate__fadeOut fastest");
		$(".reveal-circle").addClass("animate__fadeIn fastest");
		bouncyCircle.resume(0);
	});
});

function animateLeftSection(isDesktop) {
	rightSection.removeClass("active");
	mainHeadingLeft.addClass("animate__main-heading--activate slower");
	mainHeadingLeft.removeClass("animate__main-heading--deactivate slower");
	mainHeadingRight.addClass("animate__main-heading--deactivate slower");
	mainHeadingRight.removeClass("animate__main-heading--activate slower");
	if (isDesktop) {
		rightSection.css("border-top-left-radius", "50%");
		leftSection.css("border-top-right-radius", "0%");
	} else {
		rightSection.css("border-top-left-radius", "40%");
		leftSection.css("border-bottom-left-radius", "0%");
	}
}

function animateRightSection(isDesktop) {
	leftSection.removeClass("active");
	mainHeadingRight.addClass("animate__main-heading--activate slower");
	mainHeadingRight.removeClass("animate__main-heading--deactivate slower");
	mainHeadingLeft.addClass("animate__main-heading--deactivate slower");
	mainHeadingLeft.removeClass("animate__main-heading--activate slower");
	if (isDesktop) {
		leftSection.css("border-top-right-radius", "50%");
		rightSection.css("border-top-left-radius", "0");
	} else {
		leftSection.css("border-bottom-left-radius", "40%");
		rightSection.css("border-top-left-radius", "0%");
	}
}

function heroSectionAnimate(event, active = null) {
	const activeSection = active ? active : event.target.closest(".hero-column");
	if (activeSection == null) return;
	//activeSection.addClass("active");
	const isLeftSection = activeSection.classList.contains("left-section");
	const isDesktop = activeSection.classList.contains("desktop");
	activeSection.classList.add("active");
	if (isLeftSection) {
		animateLeftSection(isDesktop);
		/* heroWrapper.addClass("bg-hero-left");
		heroWrapper.removeClass("bg-hero-right"); */
	}
	if (!isLeftSection) {
		animateRightSection(isDesktop);
		/* heroWrapper.addClass("bg-hero-right");
		heroWrapper.removeClass("bg-hero-left"); */
	}
}

$(window).on("resize", debounce(checkPosition, 100));

$(".hero-intro").on("mouseover touchstart touchend", debounce(heroSectionAnimate, 20));

$(window).on("scroll", debounce(updateBackTopButton, 1000));

$('a[href^="#"]').on("click", function () {
	var href = $.attr(this, "href");
	if (href == "#") return;
	$("html").animate(
		{
			scrollTop: $(href).offset().top,
		},
		50,
		function () {
			window.location.hash = href;
		}
	);

	return false;
});

$(window).on("load", function () {
	const secondCardTemplate = $("#second-card")[0].outerHTML;
	$("#second-card").detach();
	$("#first-card").justFlipIt({ Template: secondCardTemplate, Click: ".flip-click" });
	console.log("window loaded");
	checkPosition();
	heroSectionAnimate(null, leftSection[0]);
	spinner.stopSpinner();
});
