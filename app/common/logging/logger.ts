// app/common/logging/logger.ts
type LogLevel = "info" | "warn" | "error";

interface LogOptions {
  title?: string;
  detail?: string | Record<string, any>; // if you want structured data
  error?: Error;
}

/**
 * Basic Logger interface for scalability.
 */
export interface ILogger {
  info: (message: string, options?: LogOptions) => void;
  warn: (message: string, options?: LogOptions) => void;
  error: (message: string, options?: LogOptions) => void;
}

/**
 * A simple, extendable logger for the client.
 * In production, you might silence 'info' or 'warn', or send them to a remote service.
 */
class Logger implements ILogger {
  private formatMessage(
    level: LogLevel,
    message: string,
    options?: LogOptions
  ) {
    const time = new Date().toISOString();
    const title = options?.title ? ` | Title: ${options.title}` : "";
    const detail = options?.detail
      ? ` | Detail: ${JSON.stringify(options.detail)}`
      : "";
    const errorStack = options?.error ? ` | Stack: ${options.error.stack}` : "";

    return `[${time}] [${level.toUpperCase()}] ${message}${title}${detail}${errorStack}`;
  }

  info(message: string, options?: LogOptions) {
    const finalMessage = this.formatMessage("info", message, options);
    // For dev, we can just console.log
    // In production, you might only log if a certain LOG_LEVEL is set
    console.log(finalMessage);
  }

  warn(message: string, options?: LogOptions) {
    const finalMessage = this.formatMessage("warn", message, options);
    console.warn(finalMessage);
  }

  error(message: string, options?: LogOptions) {
    const finalMessage = this.formatMessage("error", message, options);
    console.error(finalMessage);

    // Optionally send to a remote logging endpoint:
    // if (process.env.NODE_ENV === 'production') {
    //   fetch("/api/logs", { method: "POST", body: JSON.stringify({ level: "error", finalMessage }) });
    // }
  }
}

export const logger = new Logger();
