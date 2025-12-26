import sqlite3
import sys
import os
from datetime import datetime

class LibraryTracker:
    def __init__(self, db_name="library.db"):
        # Store DB in the same directory as the script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        self.db_name = os.path.join(script_dir, db_name)
        self.conn = None
        self.cursor = None
        self.connect()
        self.create_tables()

    def connect(self):
        try:
            self.conn = sqlite3.connect(self.db_name)
            self.cursor = self.conn.cursor()
        except sqlite3.Error as e:
            print(f"Error connecting to database: {e}")
            sys.exit(1)

    def create_tables(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS books (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    author TEXT NOT NULL,
                    isbn TEXT UNIQUE,
                    quantity INTEGER DEFAULT 1,
                    available INTEGER DEFAULT 1
                )
            ''')
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    book_id INTEGER,
                    action TEXT, -- 'borrow' or 'return'
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(book_id) REFERENCES books(id)
                )
            ''')
            self.conn.commit()
        except sqlite3.Error as e:
            print(f"Error creating tables: {e}")

    def add_book(self):
        print("\n--- Add a New Book ---")
        title = input("Enter Title: ").strip()
        author = input("Enter Author: ").strip()
        isbn = input("Enter ISBN (optional): ").strip()
        if not isbn:
            isbn = None
        
        try:
            qty_input = input("Enter Quantity (default 1): ").strip()
            quantity = int(qty_input) if qty_input else 1
        except ValueError:
            print("Invalid quantity. Setting to 1.")
            quantity = 1

        try:
            self.cursor.execute('''
                INSERT INTO books (title, author, isbn, quantity, available)
                VALUES (?, ?, ?, ?, ?)
            ''', (title, author, isbn, quantity, quantity))
            self.conn.commit()
            print(f"Success! '{title}' added to the library.")
        except sqlite3.IntegrityError:
            print("Error: A book with this ISBN already exists.")
        except sqlite3.Error as e:
            print(f"Database error: {e}")

    def view_books(self):
        print("\n--- Library Catalog ---")
        self.cursor.execute('SELECT id, title, author, isbn, available, quantity FROM books')
        rows = self.cursor.fetchall()
        
        if not rows:
            print("No books in the library yet.")
            return

        print(f"{'ID':<5} {'Title':<30} {'Author':<20} {'Avail/Total':<12} {'ISBN'}")
        print("-" * 80)
        for row in rows:
            book_id, title, author, isbn, available, quantity = row
            title_display = (title[:27] + '..') if len(title) > 27 else title
            author_display = (author[:17] + '..') if len(author) > 17 else author
            isbn_display = isbn if isbn else "N/A"
            print(f"{book_id:<5} {title_display:<30} {author_display:<20} {available}/{quantity:<10} {isbn_display}")

    def search_book(self):
        print("\n--- Search Book ---")
        query = input("Enter title or author to search: ").strip()
        search_pattern = f"%{query}%"
        
        self.cursor.execute('''
            SELECT id, title, author, isbn, available, quantity 
            FROM books 
            WHERE title LIKE ? OR author LIKE ?
        ''', (search_pattern, search_pattern))
        
        rows = self.cursor.fetchall()
        if not rows:
            print("No matches found.")
        else:
            print(f"\nFound {len(rows)} matches:")
            print(f"{'ID':<5} {'Title':<30} {'Author':<20} {'Avail':<5}")
            print("-" * 65)
            for row in rows:
                print(f"{row[0]:<5} {row[1]:<30} {row[2]:<20} {row[4]:<5}")

    def borrow_book(self):
        print("\n--- Borrow Book ---")
        try:
            book_id = int(input("Enter Book ID to borrow: ").strip())
        except ValueError:
            print("Invalid input. Please enter a numeric ID.")
            return

        self.cursor.execute('SELECT title, available FROM books WHERE id = ?', (book_id,))
        result = self.cursor.fetchone()

        if not result:
            print("Book not found.")
            return

        title, available = result
        if available > 0:
            try:
                self.cursor.execute('UPDATE books SET available = available - 1 WHERE id = ?', (book_id,))
                self.cursor.execute('INSERT INTO transactions (book_id, action) VALUES (?, ?)', (book_id, 'borrow'))
                self.conn.commit()
                print(f"You have borrowed '{title}'.")
            except sqlite3.Error as e:
                print(f"Error processing transaction: {e}")
        else:
            print(f"Sorry, '{title}' is currently out of stock.")

    def return_book(self):
        print("\n--- Return Book ---")
        try:
            book_id = int(input("Enter Book ID to return: ").strip())
        except ValueError:
            print("Invalid input. Please enter a numeric ID.")
            return

        self.cursor.execute('SELECT title, available, quantity FROM books WHERE id = ?', (book_id,))
        result = self.cursor.fetchone()

        if not result:
            print("Book not found.")
            return

        title, available, quantity = result
        if available < quantity:
            try:
                self.cursor.execute('UPDATE books SET available = available + 1 WHERE id = ?', (book_id,))
                self.cursor.execute('INSERT INTO transactions (book_id, action) VALUES (?, ?)', (book_id, 'return'))
                self.conn.commit()
                print(f"You have returned '{title}'.")
            except sqlite3.Error as e:
                print(f"Error processing transaction: {e}")
        else:
            print(f"All copies of '{title}' are already in the library. Cannot return.")

    def delete_book(self):
        print("\n--- Delete Book ---")
        try:
            book_id = int(input("Enter Book ID to delete: ").strip())
        except ValueError:
            print("Invalid input.")
            return

        confirm = input("Are you sure? This cannot be undone (y/n): ").lower()
        if confirm == 'y':
            try:
                self.cursor.execute('DELETE FROM books WHERE id = ?', (book_id,))
                if self.cursor.rowcount > 0:
                    print("Book deleted.")
                    self.conn.commit()
                else:
                    print("Book ID not found.")
            except sqlite3.Error as e:
                print(f"Error deleting book: {e}")
        else:
            print("Deletion cancelled.")

    def close(self):
        if self.conn:
            self.conn.close()

def main():
    tracker = LibraryTracker()
    
    while True:
        print("\n" + "="*30)
        print("  LIBRARY BOOK TRACKER")
        print("="*30)
        print("1. View All Books")
        print("2. Add a Book")
        print("3. Search for a Book")
        print("4. Borrow a Book")
        print("5. Return a Book")
        print("6. Delete a Book")
        print("7. Exit")
        
        raw_choice = input("\nEnter your choice (1-7): ").strip()
        # Handle inputs like "1." or "1. View" by taking the first part
        choice = raw_choice.split('.')[0].split(' ')[0]

        if choice == '1':
            tracker.view_books()
        elif choice == '2':
            tracker.add_book()
        elif choice == '3':
            tracker.search_book()
        elif choice == '4':
            tracker.borrow_book()
        elif choice == '5':
            tracker.return_book()
        elif choice == '6':
            tracker.delete_book()
        elif choice == '7':
            print("Goodbye!")
            tracker.close()
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
