const nsightVideosList = document.querySelectorAll("[data-nsight-video='true']");

nsightVideosList.forEach(nsightVideo => {
    const id = nsightVideo.getAttribute("data-nsight-video-id");
    const videoTargetKey = `data-nsight-video-target`;
    const videoErrorKey = `data-nsight-video-error`;

    const nsightVideoCoverImageEl = document.querySelector(`[${videoTargetKey}='${id}'][data-nsight-video-cover='true']`);
    const nsightVideoPlayBtn = document.querySelector(`[${videoTargetKey}='${id}'][data-nsight-video-control='play']`);
    const nsightVideoPauseBtn = document.querySelector(`[${videoTargetKey}='${id}'][data-nsight-video-control='pause']`);

    nsightVideoPlayBtn.addEventListener("click", () => {
        if (nsightVideo.paused) {
            nsightVideo.play();
            nsightVideoPlayBtn.style.display = 'none';
            nsightVideoPauseBtn.style.display = 'flex';
        }
    });
    
    nsightVideoPauseBtn.addEventListener("click", () => {
        if (!nsightVideo.paused) {
            nsightVideo.pause();
            nsightVideoPauseBtn.style.display = 'none';
            nsightVideoPlayBtn.style.display = 'flex';
        }
    });
    
    window.addEventListener('load', () => {
        const hasErrorOnLoad = nsightVideo.getAttribute(videoErrorKey) === "true";

        if (!hasErrorOnLoad) {
            const autoplay = nsightVideo.getAttribute("data-nsight-video-autoplay") === "true";

            nsightVideoCoverImageEl.style.display = 'none';
            if (nsightVideo.paused) {
                if (autoplay) {
                    nsightVideo.play();
                    nsightVideoPauseBtn.style.display = 'flex';
                    nsightVideoPlayBtn.style.display = 'none';
                } else {
                    nsightVideo.pause();
                    nsightVideoPauseBtn.style.display = 'none';
                    nsightVideoPlayBtn.style.display = 'flex';
                }
            }
        }
    });

    const errorHandlingFn = () => {
        nsightVideoCoverImageEl.style.display = 'block';
        nsightVideoCoverImageEl.classList.remove('hidden');
        nsightVideo.style.display = 'none';
        nsightVideoPauseBtn.style.display = 'none';
        nsightVideoPlayBtn.style.display = 'none';
        nsightVideo.setAttribute(videoErrorKey, 'true');
    };

    nsightVideo.addEventListener('error', () => errorHandlingFn());
    nsightVideo.querySelector('source').addEventListener('error', () => errorHandlingFn());
});
