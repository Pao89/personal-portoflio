import { Octokit, App } from "../../node_modules/@octokit/core/dist-web/index";
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

export async function getGitHubRepos() {
	const octokit = new Octokit();
	try {
		const { data: repos } = await octokit.request("GET /users/{username}/repos", {
			username: "Pao89",
			sort: "created",
		});
		const reposInfo = repos.map((repo) => {
			return { name: repo.name, url: repo.html_url };
		});
		for (const repo of reposInfo) {
			const { data } = await octokit.request(`GET /repos/Pao89/${repo.name}/languages`);
			repo.languages = Object.keys(data);
		}
		return reposInfo;
	} catch (err) {
		console.err("Could not load github repos, ", err);
	}
}

export default $;
