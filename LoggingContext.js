import React, { createContext, useContext } from "react";
import { logger } from "../utils/logger";


const LoggingContext = createContext();


export const LoggingProvider = ({ children }) => {
const log = (message, data) => {
logger(message, data);
};
return (
<LoggingContext.Provider value={{ log }}>
{children}
</LoggingContext.Provider>
);
};


export const useLogger = () => useContext(LoggingContext);