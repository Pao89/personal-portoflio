$.fn.isInViewport = function () {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();

	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();

	return elementBottom > viewportTop && elementTop < viewportBottom;
};

export function animateOnWaypoint(selector, animation, offset, group = "default") {
	$(selector).waypoint({
		handler: function () {
			if ($(this.element).isInViewport()) {
				$(this.element).addClass(animation);
			} else {
				$(this.element).removeClass(animation);
			}
		},
		offset: offset,
		group: group,
	});
}

export default $;
