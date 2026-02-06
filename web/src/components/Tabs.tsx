import { useState } from 'react';

interface Props {
    tabs: { label: string; content: React.ReactNode }[];
}

const Tabs = ({ tabs }: Props) => {
    const [activeTab, setActiveTab] = useState(tabs[0].label);

    return <div className="max-w-4xl mx-auto mt-8">
        <div className="flex ">
            {
                tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`flex-1 py-2 px-4 text-center front-medium transition duration-300 ${activeTab === tab.label
                            ? 'border-b-2 border-tertiary text-tertiary' : 'border-b-2 border-gray-500 text-gray-600 hover:text-secondary'
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