BE_DIR="./BE"
FE_DIR="./FE/FE_coffee"

echo "Starting BE"
cd "$BE_DIR"
python3 manage.py runserver &
cd ..
sleep 2


echo "Starting FE"
cd "$FE_DIR"
npm run dev &
