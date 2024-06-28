import React, {FC} from "react";

const ToastMessage: FC<{ message: string, alert: string }> = ({ message, alert }) => {
  return (
    <div className="toast toast-end z-50">
      <div role="alert" className={`alert alert-${alert}`}>
        <span className="text-white">{message}</span>
      </div>
    </div>
  );
}

export default ToastMessage;