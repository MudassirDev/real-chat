import { Link } from "react-router";

function Home() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-2xl text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Welcome to <span className="text-blue-600">ReactChat</span>
                    </h1>
                    <p className="text-xl text-white mb-4">
                        A blazing-fast, real-time chat experience built with React and Firebase.
                    </p>
                    <p className="text-md text-white mb-6">
                        Whether you're dropping in to say hi, meeting people from around the world, or just vibing with the community — ReactChat brings everyone together in one global chatroom, instantly and effortlessly.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/chat"
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Start Chatting
                        </Link>
                        <a
                            href="https://github.com/MudassirDev/real-chat"
                            target="_blank"
                            className="text-blue-600 border border-blue-600 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-50 transition"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
