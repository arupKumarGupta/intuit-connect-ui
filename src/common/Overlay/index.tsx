import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import closeCircleTwotone from '@iconify/icons-ant-design/close-circle-twotone';
import './Overlay.scss';
import id from 'date-fns/esm/locale/id/index.js';
interface OverlayProps {
    show: boolean;
    showCloseButton?: boolean;
    toggle?: () => void;
}
export const Overlay: React.FC<OverlayProps> = ({
    children,
    show,
    toggle,
    showCloseButton = true,
}) => {
    const overlayRef = useRef<any>(null);
    useEffect(() => {
        if (show) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    useEffect(() => {
        if (!overlayRef) {
            return;
        }
        if (!overlayRef.current) {
            return;
        }
        const elem: HTMLElement = overlayRef.current;
        if (show) {
            elem.classList.add('show');
        }
        if (show) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [show]);
    return show ? (
        <div className="overlay" ref={overlayRef}>
            {showCloseButton && (
                <button className="button close" onClick={toggle}>
                    <Icon
                        icon={closeCircleTwotone}
                        style={{ color: '#17597e', fontSize: '48px' }}
                    />
                </button>
            )}
            {children}
        </div>
    ) : (
        <></>
    );
};
