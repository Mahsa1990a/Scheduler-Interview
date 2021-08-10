import React from "react";

import "components/Button.scss";

const classNames = require('classnames');

export default function Button(props) {

   //need to have a condition to change the class of button:
   // let buttonClass = "button ";

   // if (props.confirm) {
   //    buttonClass += "button--confirm";
   // } else if (props.danger) {
   //    buttonClass += "button--danger";
   // }

   // return (
   //    <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>
   //       {props.children}
   //    </button>
   // );

   //using classNames library instead of having if statement:
   const btnclass = classNames('button', {
      // button: true,
      " button--confirm": props.confirm,
      " button--danger": props.danger
   });
   return (
      <button className={btnclass} onClick={props.onClick} disabled={props.disabled}>
         {props.children}
      </button>
   );

}
