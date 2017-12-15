/* */
import React from 'react';

/* */
import styles from './Button.scss'
import classNames from 'classnames'

const Button = ({ children, flex, className, roundCorner, invert, flat, color, padding="0.5rem",
                    xPadding, style, disabled, dark, onClick, theme, ...props }) => {

    const dynamicStyle = {
        ...( xPadding ? { paddingLeft: xPadding, paddingRight: xPadding } : {})
    }

    return (
        <div className={classNames(styles.button, styles.invert, styles.flex, styles.flat, styles.teal)}
             style={{ padding, ...style, ...dynamicStyle }}
             onClick={onClick}
             {...props}>
            {children}
        </div>
    )
}

export default Button