"use client";

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    GenForm AI Demo
                </h1>
                <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
                    <p className="text-base sm:text-lg font-semibold text-blue-700 dark:text-blue-300 animate-pulse">
                        👉 Click the blue dot to begin the demo!
                    </p>

                </div>

                <div
                    style={{
                        position: "relative",
                        paddingBottom: "calc(47.8917% + 41px)",
                        height: 0,
                        width: "100%",
                    }}
                >
                    <iframe
                        src="https://demo.arcade.software/SDz6cwsuYffgEjs9EOyp?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
                        title="GenForm AI"
                        frameBorder="0"
                        loading="lazy"
                        allow="clipboard-write"
                        allowFullScreen
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
