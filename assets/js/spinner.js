import mojs from "@mojs/core";

const spinnerRadius = 20;
//Loading spinner
$("#load-spinner div").detach();
const loadSpinner = new mojs.Shape({
	parent: "#load-spinner",
	shape: "circle",
	stroke: "#fff",
	strokeDasharray: "125, 125",
	strokeDashoffset: { 0: "-125" },
	strokeWidth: 4,
	fill: "none",
	left: "50%",
	rotate: { "-90": "270" },
	radius: spinnerRadius,
	isShowStart: true,
	isShowEnd: false,
	duration: 2000,
	easing: "back.in",
})
	.then({
		rotate: { "-90": "270" },
		strokeDashoffset: { "-125": "-250" },
		duration: 1500,
		easing: "cubic.out",
	})
	.then({
		//prettier-ignore
		rotate: { "270" : "-90" },
		strokeDashoffset: { "-250": "125" },
		duration: 1500,
		easing: "cubic.out",
	})
	.then({
		rotate: { "-90": "270" },
		strokeDashoffset: { "-125": 0 },
		duration: 1500,
		easing: "back.in",
	});

const fillSpinner = new mojs.Shape({
	parent: "#load-spinner",
	shape: "circle",
	strokeDasharray: "125, 125",
	strokeDashoffset: { 0: "250" },
	strokeWidth: 4,
	fill: "none",
	left: "50%",
	radius: spinnerRadius,
}).then({
	scale: { 0: 3 },
	stroke: "transparent",
	fill: "#0c0d16", //To change fill with themes
	radius: 500,
	easing: "linear.none",
	isForce3d: true,
	duration: 1000,
});

const fadeOverlay = new mojs.Html({
	el: ".loading-overlay",
	opacity: { 1: 0 },
	duration: 700,
	easing: "linear.none",
	isShowEnd: false,
});

const spinnerTimeline = new mojs.Timeline({ repeat: 100 });
const openingTimeline = new mojs.Timeline();

spinnerTimeline.append(loadSpinner);
openingTimeline.append(fillSpinner);
openingTimeline.append(fadeOverlay);

export function runSpinner() {
	spinnerTimeline.play();
}

export function stopSpinner() {
	spinnerTimeline.stop(1);
	openingTimeline.play();
}

runSpinner();
