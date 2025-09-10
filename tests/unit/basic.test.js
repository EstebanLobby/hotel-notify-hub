// Basic tests to verify testing setup
describe('Basic Test Suite', () => {
  test('should run basic assertions', () => {
    expect(true).toBe(true);
    expect(1 + 1).toBe(2);
    expect('hello').toMatch(/hello/);
  });

  test('should work with arrays', () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits).toHaveLength(3);
    expect(fruits).toContain('banana');
    expect(fruits[0]).toBe('apple');
  });

  test('should work with objects', () => {
    const hotel = {
      id: 1,
      name: 'Test Hotel',
      active: true
    };
    
    expect(hotel).toHaveProperty('id');
    expect(hotel).toHaveProperty('name', 'Test Hotel');
    expect(hotel.active).toBe(true);
  });

  test('should work with async functions', async () => {
    const asyncFunction = () => Promise.resolve('success');
    const result = await asyncFunction();
    expect(result).toBe('success');
  });

  test('should work with DOM elements', () => {
    // Create a simple DOM element
    const div = document.createElement('div');
    div.id = 'test-div';
    div.textContent = 'Hello World';
    
    expect(div.id).toBe('test-div');
    expect(div.textContent).toBe('Hello World');
    expect(div.tagName).toBe('DIV');
  });

  test('should work with mocks', () => {
    const mockFunction = jest.fn();
    mockFunction('test');
    
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith('test');
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
