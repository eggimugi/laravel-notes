import { SearchInput } from '@/components/search-input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Tag } from '@/types';

type NoteFiltersProps = {
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sort: string;
    onSortChange: (value: string) => void;
    tagFilter: string;
    onTagFilterChange: (value: string) => void;
    allTags: Tag[];
};

export function NoteFilters({
    onSearchChange,
    sort,
    onSortChange,
    tagFilter,
    onTagFilterChange,
    allTags,
}: NoteFiltersProps) {
    return (
        <>
            <SearchInput
                onChange={onSearchChange}
            />

            <Select
                value={sort}
                onValueChange={(value) => onSortChange(value)}
            >
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sort by</SelectLabel>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select value={tagFilter} onValueChange={onTagFilterChange}>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tags</SelectLabel>
                        <SelectItem value="">All</SelectItem>
                        {allTags.map((tag) => (
                            <SelectItem key={tag.id} value={tag.name}>
                                {tag.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
}