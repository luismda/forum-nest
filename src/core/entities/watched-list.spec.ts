import { WatchedList } from './watched-list'

class StringWatchedList extends WatchedList<string> {
  compareItems(a: string, b: string): boolean {
    return a === b
  }
}

describe('watched list', () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new StringWatchedList(['a', 'b', 'c'])

    expect(list.getItems()).toHaveLength(3)
  })

  it('should be able to add new items to the list', () => {
    const list = new StringWatchedList(['a', 'b', 'c'])

    list.add('d')

    expect(list.getItems()).toHaveLength(4)
    expect(list.getNewItems()).toEqual(['d'])
  })

  it('should be able to remove items from the list', () => {
    const list = new StringWatchedList(['a', 'b', 'c'])

    list.remove('b')

    expect(list.getItems()).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual(['b'])
  })

  it('should be able to add an item even if it was removed before', () => {
    const list = new StringWatchedList(['a', 'b', 'c'])

    list.remove('b')
    list.add('b')

    expect(list.getItems()).toHaveLength(3)
    expect(list.getNewItems()).toEqual([])
    expect(list.getRemovedItems()).toEqual([])
  })

  it('should be able to remove an item even if it was added before', () => {
    const list = new StringWatchedList(['a', 'b', 'c'])

    list.add('d')
    list.remove('d')

    expect(list.getItems()).toHaveLength(3)
    expect(list.getNewItems()).toEqual([])
    expect(list.getRemovedItems()).toEqual([])
  })

  it('should be able to update watched list items', () => {
    const list = new StringWatchedList(['a', 'b', 'c'])

    list.update(['a', 'c', 'e'])

    expect(list.getNewItems()).toEqual(['e'])
    expect(list.getRemovedItems()).toEqual(['b'])
  })
})
