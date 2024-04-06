import { useAtom } from 'jotai';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null;

  async function removeHistoryClicked(index) {
    await removeFromHistory(searchHistory[index]);
    setSearchHistory(current => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  }
  return (
    <>
      {searchHistory?.length > 0 ? (
        <ListGroup>
          {searchHistory.map((historyItem, index) => (
            <ListGroup.Item key={index}>
              {historyItem}
              <Button className="float-end" variant="danger" size="sm" onClick={() => removeHistoryClicked(index)}>
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for some artwork.
          </Card.Body>
        </Card>
      )}
    </>
  );
}
