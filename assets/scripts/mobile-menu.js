import { viewportUtils } from './viewport-utils.js';

const mobileMenuKey = 'mobile-menu';

const mobileMenu = {
    element: document.getElementById(mobileMenuKey),
    isOpen: () => {
        return mobileMenu.element.style.display !== 'none';
    },
    show: ({ hideOverflow }) => {
        mobileMenu.element.style.display = 'block';
        if (hideOverflow) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    },
    hide: () => {
        mobileMenu.element.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

function updateMobileMenuVisibility({ show, hideOverflowOnShow }) {
    if (show) {
        mobileMenu.show({ hideOverflow: hideOverflowOnShow });
    } else {
        mobileMenu.hide();
    }
}

const mobileMenuToggle = document.querySelectorAll(`[data-toggle="${mobileMenuKey}"]`);
mobileMenuToggle.forEach(toggle => {
    toggle.addEventListener('click', () => {
        updateMobileMenuVisibility({
            show: !mobileMenu.isOpen(),
            hideOverflowOnShow: true
        });
    });
});

// Initialize the mobile menu closed state
updateMobileMenuVisibility({
    show: !viewportUtils.isMobile(),
    hideOverflowOnShow: false
});

// Listen for changes in the viewport size
window.addEventListener('resize', () => {
    updateMobileMenuVisibility({
        show: !viewportUtils.isMobile(),
        hideOverflowOnShow: viewportUtils.isMobile()
    });
});
