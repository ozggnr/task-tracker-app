import { MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
    children: ReactNode;
    parentId: string;
};
export default function Portal({ children, parentId }: PortalProps) {
    //We always want to refer to the same DOM div
    const elRef = useRef<HTMLDivElement | null>(null);

    if (!elRef.current) {
        elRef.current = document.createElement('div');
    }

    /*mount a div inside of portal whenever this is 
    rendered and clean up/remove it after it's unrendered
    */
    useEffect(() => {
        const elementRoot = document.getElementById(parentId);
        if (!elementRoot || !elRef.current) {
            return;
        }
        elementRoot.appendChild(elRef.current);
        return () => {
            if (elRef.current) {
                elementRoot.removeChild(elRef.current);
            }
        };
    }, []);

    /*portals provides the ability for an element to render outside of
    the default hierarchy without compromising the parent
    child relationship between components*/
    return createPortal(children, elRef.current);
}
