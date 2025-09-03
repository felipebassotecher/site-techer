const nsightVideoEl = document.getElementById("nsight-video");
const nsightVideoCoverImageEl = document.getElementById("nsight-video-cover-img");
const nsightVideoPlayBtn = document.getElementById("nsight-video-play-btn");
const nsightVideoPauseBtn = document.getElementById("nsight-video-pause-btn");

nsightVideoPlayBtn.addEventListener("click", () => {
    if (nsightVideoEl.paused) {
        nsightVideoEl.play();
        nsightVideoPlayBtn.style.display = 'none';
        nsightVideoPauseBtn.style.display = 'flex';
    }
});

nsightVideoPauseBtn.addEventListener("click", () => {
    if (!nsightVideoEl.paused) {
        nsightVideoEl.pause();
        nsightVideoPauseBtn.style.display = 'none';
        nsightVideoPlayBtn.style.display = 'flex';
    }
});

window.addEventListener('load', () => {
    nsightVideoCoverImageEl.style.display = 'none';
    if (nsightVideoEl.paused) {
        nsightVideoEl.play();
        nsightVideoPauseBtn.style.display = 'flex';
        nsightVideoPlayBtn.style.display = 'none';
    }
});

nsightVideoEl.addEventListener('error', () => {
    nsightVideoCoverImageEl.style.display = 'block';
    nsightVideoEl.style.display = 'none';
    nsightVideoPauseBtn.style.display = 'none';
    nsightVideoPlayBtn.style.display = 'none';
});