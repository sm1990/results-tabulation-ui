import React, {useState} from "react";
import CustomizedSnackbars from "../components/snack-bar"

const MessagesContext = React.createContext([]);

export function MessagesProvider(props) {
    const [state, setState] = useState({
        messagesList: [],
        messagesMap: {}
    });

    const push = function (messageTitle, messageBody, messageType = "Info") {
        const message = {messageId: state.messagesList.length, messageTitle, messageBody, messageType, open: true};
        setState({
            ...state,
            messagesList: [
                ...state.messagesList,
                message.messageId
            ],
            messagesMap: {
                ...state.messagesMap,
                [message.messageId]: message
            }
        })
    };

    const closeMessage = function (messageId) {
        setState({
            ...state,
            messagesMap: {
                ...state.messagesMap,
                [messageId]: {
                    ...state.messagesMap[messageId],
                    open: false
                }
            }
        })
    };

    const handleCloseMessage = (messageId) => (event) => {
        closeMessage(messageId)
    };


    return <MessagesContext.Provider
        value={{push, messages: state.messagesList.map((messageId) => state.messagesMap[messageId])}}
    >
        {state.messagesList.map((messageId) => {
            const message = state.messagesMap[messageId];
            if (message.open && messageId===(state.messagesList.length-1)) {
                return <CustomizedSnackbars title={message.messageTitle} content={message.messageBody}/>
            }
        })}
        {props.children}
    </MessagesContext.Provider>
}

export const MessagesConsumer = MessagesContext.Consumer;
