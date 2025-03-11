import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigatePage } from '@/hooks/logic-hooks/navigate-hooks';
import { IFlow } from '@/interfaces/database/flow';
import { formatPureDate } from '@/utils/date';
import { ChevronRight, Trash2 } from 'lucide-react';

interface IProps {
  data: IFlow;
}

export function SearchCard({ data }: IProps) {
  const { navigateToSearch } = useNavigatePage();

  return (
    <Card className="bg-colors-background-inverse-weak border-colors-outline-neutral-standard hover:shadow-md transition-shadow duration-300" style={{
      borderColor: 'rgba(10, 56, 97, 0.15)',
      boxShadow: '0 2px 8px rgba(10, 56, 97, 0.08)'
    }}>
      <CardContent className="p-4">
        <div className="flex justify-between mb-4">
          {data.avatar ? (
            <div
              className="w-[70px] h-[70px] rounded-xl bg-cover"
              style={{
                backgroundImage: `url(${data.avatar})`,
                border: '1px solid rgba(10, 56, 97, 0.1)',
                boxShadow: '0 2px 6px rgba(10, 56, 97, 0.1)'
              }}
            />
          ) : (
            <Avatar className="w-[70px] h-[70px]" style={{
              backgroundColor: 'rgba(10, 56, 97, 0.1)',
              border: '1px solid rgba(10, 56, 97, 0.2)'
            }}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback style={{ color: '#0A3861', fontWeight: 500 }}>CN</AvatarFallback>
            </Avatar>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#0A3861' }}>{data.title}</h3>
        <p style={{ color: 'rgba(10, 56, 97, 0.8)' }}>An app that does things An app that does things</p>
        <section className="flex justify-between pt-3">
          <div>
            <span style={{ color: '#A8232F', fontWeight: 500 }}>Search app</span>
            <p className="text-sm opacity-80" style={{ color: 'rgba(10, 56, 97, 0.6)' }}>
              {formatPureDate(data.update_time)}
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="icon"
              size="icon"
              onClick={navigateToSearch}
              style={{
                backgroundColor: 'rgba(10, 56, 97, 0.05)',
                color: '#0A3861',
                '&:hover': {
                  backgroundColor: 'rgba(10, 56, 97, 0.1)',
                }
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              variant="icon"
              size="icon"
              style={{
                backgroundColor: 'rgba(168, 35, 47, 0.05)',
                color: '#A8232F',
                '&:hover': {
                  backgroundColor: 'rgba(168, 35, 47, 0.1)',
                }
              }}
            >
              <Trash2 />
            </Button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
