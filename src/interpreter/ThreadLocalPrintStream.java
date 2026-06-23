package interpreter;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;

/**
 * ThreadLocalPrintStream overrides PrintStream to redirect System.out in a thread-safe manner.
 * Each request thread has its own ByteArrayOutputStream to capture the interpreter's stdout output.
 */
public class ThreadLocalPrintStream extends PrintStream {
    private static final ThreadLocal<ByteArrayOutputStream> threadBuffer = new ThreadLocal<>();
    private final PrintStream originalOut;

    public ThreadLocalPrintStream(PrintStream originalOut) {
        super(originalOut);
        this.originalOut = originalOut;
    }

    public static void startCapture() {
        threadBuffer.set(new ByteArrayOutputStream());
    }

    public static String stopCapture() {
        ByteArrayOutputStream buffer = threadBuffer.get();
        threadBuffer.remove();
        return buffer != null ? buffer.toString(StandardCharsets.UTF_8) : "";
    }

    @Override
    public void write(int b) {
        ByteArrayOutputStream buffer = threadBuffer.get();
        if (buffer != null) {
            buffer.write(b);
        } else {
            originalOut.write(b);
        }
    }

    @Override
    public void write(byte[] buf, int off, int len) {
        ByteArrayOutputStream buffer = threadBuffer.get();
        if (buffer != null) {
            buffer.write(buf, off, len);
        } else {
            originalOut.write(buf, off, len);
        }
    }
}
