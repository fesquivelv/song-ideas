import { useState } from 'react';

interface Props {
    tabs: { label: string; content: React.ReactNode }[];
}

const Tabs = ({ tabs }: Props) => {
    const [activeTab, setActiveTab] = useState(tabs[0].label);

    return <div className="max-w-4xl mx-auto mt-8">
        <div className="flex border-b border-gray-300">
            {
                tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`flex-1 py-2 px-4 text-center front-medium transition duration-300 ${activeTab === tab.label
                            ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600 hover:text-purple-700'
                            }`}>
                        {tab.label}
                    </button>
                ))}
        </div>
        <div className="py-4">
            {tabs.find(tab => tab.label === activeTab)?.content}
        </div>
    </div>;
};

export default Tabs;