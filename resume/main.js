const navbarContainer = document.querySelector("#navbar-container");
const content = document.querySelector(".content");
const headerHeight = navbarContainer.clientHeight

let lastScroll = 0;
const fn_peek_a_boo = () => {
	const contentPosition = content.getBoundingClientRect().top;
	const currentScroll = window.pageYOffset;
	if (contentPosition <= 0 && currentScroll > lastScroll) {
		navbarContainer.style.transform = "translate3d(0, -100%, 0)";
		content.style.transform = `translate3d(0, -${headerHeight}px, 0)`;
	} else {
		navbarContainer.style.transform = "translate3d(0, 0, 0)";
		content.style.transform = "translate3d(0, 0, 0)";
	}
	lastScroll = currentScroll;
}
window.addEventListener("scroll", fn_peek_a_boo);


// IntersectionObserver

const contentHeader = document.querySelectorAll(".content-header");
let vh = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0)
let	contentHeaderHeight = contentHeader[1].clientHeight;

new ResizeObserver(() => {
	vh = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}).observe(document.body)

let options = {
	root: null,
	rootMargin: `0px 0px -${vh - headerHeight - contentHeaderHeight}px 0px`,
	threshold: 0.9
};

const fn_observe = (entries) => {
	entries.forEach(entry => {
		console.log(entry)
		if (entry.isIntersecting) {
			entry.target.classList.add("is-visible");
			entry.target.style.borderRadius = "0 0 25px 25px";
		} else {
			entry.target.style.borderRadius = "25px";
			entry.target.classList.remove("is-visible");
		}
	});
}

const observer = new IntersectionObserver(fn_observe, options);
observer.observe(contentHeader[1]);