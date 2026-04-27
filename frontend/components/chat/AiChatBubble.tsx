"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getChatSession } from "@/helpers/session-storage.helper";
import { sessionDetailsApi } from "@/api/chatbot/chatbot.api";

// Skeleton for loading individual messages or initial session loading
function MessageSkeleton({ isAssistant = true }: { isAssistant?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[85%] text-sm w-full",
        !isAssistant ? "self-end items-end" : "self-start items-start"
      )}
    >
      <div
        className={cn(
          "px-4 py-2.5 rounded-2xl animate-pulse min-w-[120px] h-10",
          !isAssistant
            ? "bg-primary/50 text-primary-foreground rounded-br-sm"
            : "bg-muted/80 text-foreground rounded-bl-sm border border-border/50 shadow-sm"
        )}
      >
        <div className="flex items-center space-x-2 h-full">
          <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export function AiChatBubble() {
  const [info, setInfo] = useState({
    isOpen: false,
    sessionLoading: false,
    isLoading: false,
    inputMessage: "",
    sessionId : "",
  });
  
  // Define message state structure based on API
  const [messages, setMessages] = useState<any[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sessionExist = getChatSession();
    if (sessionExist) {
      setInfo((prev) => ({ ...prev, sessionId: sessionExist }));
      getSessionDetailsFunction(sessionExist);
    }
  }, []);

  const getSessionDetailsFunction = async (sessionId: string) => {
    setInfo((prev) => ({ ...prev, sessionLoading: true }));
    try {
      const response = await sessionDetailsApi(sessionId);
      if (response[0] && response[1].data) {
        // Assume response.data contains the session structure provided earlier
        setMessages(response[1].data.messages || []);
      }
    } catch (error) {
      console.error("Failed to load session details", error);
    } finally {
      setInfo((prev) => ({ ...prev, sessionLoading: false }));
    }
  };

  // Auto-scroll to bottom of messages when opened or on new message
  useEffect(() => {
    if (info.isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [info.isOpen, messages, info.sessionLoading]);

  const toggleChat = () => setInfo((prev) => ({ ...prev, isOpen: !prev.isOpen }));

  // A simple function to parse new lines to break tags temporarily
  // for the mock markdown text till we integrate markdown
  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        {idx !== content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanding Chat Panel */}
      <div
        className={cn(
          "mb-4 overflow-hidden rounded-2xl border border-border/50 shadow-2xl transition-all duration-300 ease-out origin-bottom-right sm:w-[400px] w-[calc(100vw-3rem)]",
          "bg-background/80 backdrop-blur-xl", // Glassmorphism
          info.isOpen
            ? "scale-100 opacity-100 flex h-[600px] max-h-[calc(100vh-8rem)] flex-col"
            : "scale-95 opacity-0 pointer-events-none h-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground leading-none">
                AI Assistant
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Online & ready to help
              </p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex flex-col gap-4 pb-4">
            {info.sessionLoading ? (
              // Loading state for initial session fetch
              <>
                <MessageSkeleton isAssistant={false} />
                <MessageSkeleton isAssistant={true} />
              </>
            ) : (
              messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex flex-col max-w-[85%] text-sm",
                      isUser ? "self-end items-end" : "self-start items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-2.5 rounded-2xl",
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted/80 text-foreground rounded-bl-sm border border-border/50 shadow-sm"
                      )}
                    >
                      {renderMessageContent(message.content)}
                    </div>
                    {message.timestamp && (
                      <span className="text-[10px] text-muted-foreground mt-1 px-1">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                );
              })
            )}

            {info.isLoading && !info.sessionLoading && (
               <MessageSkeleton isAssistant={true} />
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-border/50 bg-background/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setInfo(prev => ({ ...prev, inputMessage: "" }));
            }}
            className="flex items-center gap-2 relative shadow-sm rounded-full bg-muted/30 border border-border/50 px-2 py-1.5 focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all"
          >
             <input
               type="text"
               placeholder="Type your message..."
               className="flex-1 bg-transparent px-3 py-1.5 text-sm focus:outline-none placeholder:text-muted-foreground/70"
               value={info.inputMessage}
               onChange={(e) => setInfo(prev => ({ ...prev, inputMessage: e.target.value }))}
               disabled={info.sessionLoading || info.isLoading}
             />
             <button
               type="submit"
               disabled={!info.inputMessage.trim() || info.sessionLoading || info.isLoading}
               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-all hover:opacity-90 disabled:cursor-not-allowed"
             >
               <Send className="h-4 w-4 ml-0.5" />
             </button>
          </form>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group relative z-50",
          info.isOpen
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {info.isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        {/* Subtle ping animation indicator when closed */}
        {!info.isOpen && (
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-background"></span>
           </span>
        )}
      </button>
    </div>
  )};
