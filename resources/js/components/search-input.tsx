import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchInput({ onChange }: Props) {
    return (
        <>
            <div className="flex w-full items-center gap-2">
                <SearchIcon />
                <Input
                    type="text"
                    name="search"
                    placeholder="Search notes..."
                    onChange={onChange}
                    className="w-full"
                />
            </div>
        </>
    );
}
