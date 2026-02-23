import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

const ClientLayout = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-background">
            {/* Header is shared across client pages */}
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <main>
                <Outlet context={{ searchQuery, setSearchQuery }} />
            </main>
            {/* You could add a Footer here later */}
        </div>
    );
};

export default ClientLayout;
