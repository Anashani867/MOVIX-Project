<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <h2>Register</h2>

    <form method="POST" action="{{ url('/api/register') }}">
        @csrf

        <div>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
        </div>

        <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
        </div>

        <div>
            <label for="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" name="password_confirmation" required>
        </div>

        <button type="submit">Register</button>
    </form>

</body>
</html>
