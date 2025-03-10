import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchInput = () => {
  return (
    <div className="relative hidden sm:block">
      <Search className="text-muted-foreground absolute top-3 left-4 h-4 w-4" />
      <Input placeholder="Search" className="bg-primary/10 pl-10" />
    </div>
  )
}

export default SearchInput
