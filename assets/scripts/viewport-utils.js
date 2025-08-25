export const viewportUtils = {
    isMobile: () => {
        return window.matchMedia('(max-width: 639px)').matches;
    }
};
