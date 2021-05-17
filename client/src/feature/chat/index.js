import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';


export default function Chat() {
    return (
        <div>
             <MessengerCustomerChat
                pageId={process.env.REACT_APP_MESSANGER_CUSTOMER_CHAT_PAGE_ID}
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            />
        </div>
    )
}
