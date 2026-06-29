import { usePage } from '@inertiajs/react';
import { Notebook, CalendarCheck, CalendarClock } from 'lucide-react';
import StatCard from '@/components/stat-card';

type Props = {
    stats: {
        total: number;
        completed: number;
        in_progress: number;
    };
};

export default function StatsSummary({ stats }: Props) {
    const { auth } = usePage().props;

    return (
        <>
            <div className="flex items-center justify-between border rounded-lg p-4">
                <div>
                    <h1 className="mb-2 text-2xl font-bold text-muted-foreground">
                        Welcome back, {auth.user.name}!
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Here's a quick overview of your notes and progress.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-12">
                    <StatCard
                        icon={Notebook}
                        label="Total Notes"
                        value={stats.total}
                    />
                    <StatCard
                        icon={CalendarCheck}
                        label="Notes Completed"
                        value={stats.completed}
                    />
                    <StatCard
                        icon={CalendarClock}
                        label="Notes In Progress"
                        value={stats.in_progress}
                    />
                </div>
            </div>
        </>
    );
}
