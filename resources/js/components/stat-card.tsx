import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader } from './ui/card';

export default function StatCard({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: number;
}) {
    return (
        <Card className="gap-2 border-none py-0">
            <CardHeader className="flex-row items-center justify-end gap-2 px-0">
                <div className="rounded-md border p-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-muted-foreground">{label}</h3>
            </CardHeader>
            <div className="flex items-baseline gap-2">
                <span className="ml-auto text-3xl font-bold">{value}</span>
                <span className="text-sm text-muted-foreground">
                    notes
                </span>
            </div>
        </Card>
    );
}
