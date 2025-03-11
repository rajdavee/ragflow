import ListFilterBar from '@/components/list-filter-bar';
import { useFetchFlowList } from '@/hooks/flow-hooks';
import { Plus } from 'lucide-react';
import { SearchCard } from './search-card';

export default function SearchList() {
  const { data } = useFetchFlowList();

  return (
    <section style={{ backgroundColor: '#f5f7fa' }}>
      <div className="px-8 pt-8">
        <ListFilterBar title="Search apps" titleStyle={{ color: '#0A3861', fontWeight: 600 }}>
          <button
            className="flex items-center px-4 py-2 rounded-md text-white transition-colors duration-200 ease-in-out"
            style={{
              backgroundColor: '#0A3861',
              boxShadow: '0 2px 6px rgba(10, 56, 97, 0.2)',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#072a49'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0A3861'}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create app
          </button>
        </ListFilterBar>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 max-h-[84vh] overflow-auto px-8 py-6">
        {data.map((x) => {
          return <SearchCard key={x.id} data={x}></SearchCard>;
        })}
      </div>
    </section>
  );
}
