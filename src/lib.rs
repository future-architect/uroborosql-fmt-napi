#![deny(clippy::all)]

use napi::{Error, Result, Status};
use std::panic;
use uroborosql_fmt::format_sql;

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn runfmt(input: String) -> Result<String> {
  let result = panic::catch_unwind(|| format_sql(&input));

  match result {
    Ok(res) => Ok(res),
    Err(_) => Err(Error::new(
      Status::GenericFailure,
      "format_error".to_string(),
    )),
  }
}
