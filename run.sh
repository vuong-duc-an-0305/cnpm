BE_DIR="./BE"
FE_DIR="./FE/FE_coffee"

echo "Starting BE"
cd "$BE_DIR"
python manage.py runserver &
cd ..

echo "Starting FE"
cd "$FE_DIR"
npm run dev
