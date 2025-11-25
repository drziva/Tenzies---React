import {useRef,useEffect} from 'react';

export default function Die(props) {
    const buttonRef = useRef(null)

    useEffect(() => {
        if (props.isHeld) {
            buttonRef.current.classList.add("on")
        } else {
            buttonRef.current.classList.remove("on")
        }
    }, [props.isHeld])
    return (
        <button ref={buttonRef} onClick={() => props.holdDice(props.id)}>
            {props.value}
        </button>
    )
}
