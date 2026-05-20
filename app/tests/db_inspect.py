from app.database import SessionLocal
from app.models import User

def main():
    db = SessionLocal()
    users = db.query(User).all()
    print('count', len(users))
    for u in users:
        print(u.id, u.username, u.email)

if __name__ == '__main__':
    main()
